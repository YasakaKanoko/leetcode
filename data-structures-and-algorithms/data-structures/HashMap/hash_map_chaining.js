/* 链式地址哈希表 */
class HashMapChaining {
    #size; // 键值对数量
    #capacity; // 哈希表容量
    #loadThres; // 触发扩容的负载因子阈值
    #extendRatio; // 扩容倍数
    #buckets; // 桶数组

    /* 构造方法 */
    constructor() {
        this.#size = 0;
        this.#capacity = 4;
        this.#loadThres = 2.0 / 3.0;
        this.#extendRatio = 2;
        this.#buckets = new Array(this.#capacity).fill(null).map((x) => []);
    }

    /* 哈希函数 */
    #hashFunc(key) {
        return key % this.#capacity;
    }

    /* 负载因子 */
    #loadFactor() {
        return this.#size / this.#capacity;
    }

    /* 查询操作 */
    get(key) {
        const index = this.#hashFunc(key);
        const bucket = this.#buckets[index];
        // 遍历桶，若找到 key ，则返回对应 val
        for (const pair of bucket) {
            if (pair.key === key) {
                return pair.val;
            }
        }
        // 若未找到 key ，则返回 null
        return null;
    }

    /* 添加操作 */
    put(key, val) {
        // 当负载因子超过阈值时，执行扩容
        if (this.#loadFactor() > this.#loadThres) {
            this.#extend();
        }
        const index = this.#hashFunc(key);
        const bucket = this.#buckets[index];
        // 遍历桶，若遇到指定 key ，则更新对应 val 并返回
        for (const pair of bucket) {
            if (pair.key === key) {
                pair.val = val;
                return;
            }
        }
        // 若无该 key ，则将键值对添加至尾部
        const pair = new Pair(key, val);
        bucket.push(pair);
        this.#size++;
    }

    /* 删除操作 */
    remove(key) {
        const index = this.#hashFunc(key);
        let bucket = this.#buckets[index];
        // 遍历桶，从中删除键值对
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.#size--;
                break;
            }
        }
    }

    /* 扩容哈希表 */
    #extend() {
        // 暂存原哈希表
        const bucketsTmp = this.#buckets;
        // 初始化扩容后的新哈希表
        this.#capacity *= this.#extendRatio;
        this.#buckets = new Array(this.#capacity).fill(null).map((x) => []);
        this.#size = 0;
        // 将键值对从原哈希表搬运至新哈希表
        for (const bucket of bucketsTmp) {
            for (const pair of bucket) {
                this.put(pair.key, pair.val);
            }
        }
    }

    /* 打印哈希表 */
    print() {
        for (const bucket of this.#buckets) {
            let res = [];
            for (const pair of bucket) {
                res.push(pair.key + ' -> ' + pair.val);
            }
            console.log(res);
        }
    }
}