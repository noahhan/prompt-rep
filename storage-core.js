(function attachStorageCore(root) {
  const DB_NAME = "prompt-vault";
  const DB_VERSION = 1;
  const META_STORE = "metadata";
  const CATEGORY_STORE = "categories";
  const PROMPT_STORE = "prompts";
  const SCHEMA_VERSION_KEY = "schemaVersion";
  const MIGRATED_AT_KEY = "migratedFromLocalStorageAt";

  function normalizeState(value) {
    return {
      categories: Array.isArray(value?.categories) ? value.categories.filter(Boolean) : [],
      prompts: Array.isArray(value?.prompts) ? value.prompts : []
    };
  }

  function readLocalState(storageKey) {
    try {
      const raw = root.localStorage?.getItem(storageKey);
      return raw ? normalizeState(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }

  function writeLocalState(storageKey, state) {
    root.localStorage?.setItem(storageKey, JSON.stringify(normalizeState(state)));
  }

  function readLocalValue(key) {
    try {
      return root.localStorage?.getItem(key) || null;
    } catch {
      return null;
    }
  }

  function writeLocalValue(key, value) {
    root.localStorage?.setItem(key, value);
  }

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function transactionDone(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  function openDatabase() {
    if (!root.indexedDB) return Promise.reject(new Error("IndexedDB is not available."));
    return new Promise((resolve, reject) => {
      const request = root.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains(CATEGORY_STORE)) {
          db.createObjectStore(CATEGORY_STORE, { keyPath: "name" });
        }
        if (!db.objectStoreNames.contains(PROMPT_STORE)) {
          const promptStore = db.createObjectStore(PROMPT_STORE, { keyPath: "id" });
          promptStore.createIndex("category", "category", { unique: false });
          promptStore.createIndex("updatedAt", "updatedAt", { unique: false });
          promptStore.createIndex("title", "title", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function readIndexedState(db) {
    const transaction = db.transaction([CATEGORY_STORE, PROMPT_STORE], "readonly");
    const categories = await requestToPromise(transaction.objectStore(CATEGORY_STORE).getAll());
    const prompts = await requestToPromise(transaction.objectStore(PROMPT_STORE).getAll());
    await transactionDone(transaction);
    return normalizeState({
      categories: categories.map((category) => category.name).filter(Boolean),
      prompts
    });
  }

  async function writeIndexedState(db, state) {
    const normalized = normalizeState(state);
    const transaction = db.transaction([CATEGORY_STORE, PROMPT_STORE], "readwrite");
    const categoryStore = transaction.objectStore(CATEGORY_STORE);
    const promptStore = transaction.objectStore(PROMPT_STORE);
    categoryStore.clear();
    promptStore.clear();
    const now = new Date().toISOString();
    normalized.categories.forEach((name) => {
      categoryStore.put({ name, updatedAt: now });
    });
    normalized.prompts.forEach((prompt) => {
      promptStore.put(prompt);
    });
    await transactionDone(transaction);
  }

  async function readMetadata(db, key) {
    const transaction = db.transaction(META_STORE, "readonly");
    const result = await requestToPromise(transaction.objectStore(META_STORE).get(key));
    await transactionDone(transaction);
    return result?.value ?? null;
  }

  async function writeMetadata(db, key, value) {
    const transaction = db.transaction(META_STORE, "readwrite");
    transaction.objectStore(META_STORE).put({ key, value });
    await transactionDone(transaction);
  }

  async function initStorage(options) {
    const fallbackState = normalizeState(options.fallbackState);
    const localState = readLocalState(options.storageKey);
    try {
      const db = await openDatabase();
      const indexedState = await readIndexedState(db);
      if (indexedState.prompts.length) {
        return { backend: "indexeddb", db, state: indexedState, migrated: false, hasStoredData: true };
      }
      if (localState?.prompts.length) {
        await writeIndexedState(db, localState);
        await writeMetadata(db, SCHEMA_VERSION_KEY, 1);
        await writeMetadata(db, MIGRATED_AT_KEY, new Date().toISOString());
        const starterVersion = readLocalValue(options.starterLibraryKey);
        if (starterVersion) await writeMetadata(db, options.starterLibraryKey, starterVersion);
        return { backend: "indexeddb", db, state: localState, migrated: true, hasStoredData: true };
      }
      return { backend: "indexeddb", db, state: fallbackState, migrated: false, hasStoredData: false };
    } catch (error) {
      return {
        backend: "localStorage",
        db: null,
        state: localState || fallbackState,
        migrated: false,
        hasStoredData: Boolean(localState?.prompts.length),
        warning: error?.message || "IndexedDB is not available."
      };
    }
  }

  async function saveState(storage, state, storageKey) {
    const normalized = normalizeState(state);
    writeLocalState(storageKey, normalized);
    if (storage?.backend === "indexeddb" && storage.db) {
      await writeIndexedState(storage.db, normalized);
    }
  }

  async function readStarterLibraryVersion(storage, starterLibraryKey) {
    if (storage?.backend === "indexeddb" && storage.db) {
      return (await readMetadata(storage.db, starterLibraryKey)) || readLocalValue(starterLibraryKey);
    }
    return readLocalValue(starterLibraryKey);
  }

  async function writeStarterLibraryVersion(storage, starterLibraryKey, version) {
    writeLocalValue(starterLibraryKey, version);
    if (storage?.backend === "indexeddb" && storage.db) {
      await writeMetadata(storage.db, starterLibraryKey, version);
    }
  }

  root.PromptVaultStorage = {
    initStorage,
    normalizeState,
    readLocalState,
    saveState,
    readStarterLibraryVersion,
    writeStarterLibraryVersion
  };
})(typeof window !== "undefined" ? window : globalThis);
