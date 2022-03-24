export class ResolverCacheManager {
  cacheDataList: Map<object | string, ResolverCacheManagerCacheData> =
    new Map();
  load(key: object | string): ResolverCacheManagerCacheData {
    if (this.cacheDataList.has(key)) {
      return this.cacheDataList.get(key) as ResolverCacheManagerCacheData;
    }
    const newResolverCacheDataManager = new ResolverCacheManagerCacheData();
    this.cacheDataList.set(key, newResolverCacheDataManager);
    return newResolverCacheDataManager;
  }
}

export class ResolverCacheManagerCacheData {
  data: unknown;
  get hasData() {
    return !!this.data;
  }
  cacheAndReturnData<T>(data: T) {
    this.data = data;
    return data;
  }
}
