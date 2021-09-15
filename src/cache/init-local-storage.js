export default function initLocalStorage() {
  try {
    let storage;
    const uid = new Date;
    (storage = window.localStorage).setItem(uid, uid);
    const fail = storage.getItem(uid) != uid;
    if (fail) throw new Error();
    storage.removeItem(uid);
    return storage;
  } catch (exception) {
    throw 'Local storage is not supported by current environment';
  }
}
