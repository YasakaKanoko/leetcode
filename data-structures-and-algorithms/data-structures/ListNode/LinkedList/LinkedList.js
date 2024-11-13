class Node {
    constructor(data, next) {
        this.data = (data === undefined ? 0 : data);
        this.next = (next === undefined ? null : next);
    };
}
class LinkedList {

    // 初始链表长度为0
    length = 0;
    // 初始head为null, head指向第一个节点
    head = null;

    // append(element): 向尾部添加元素
    append(element) {
        // 1. 创建新节点
        const newNode = new Node(element);
        // 2. 判断: 如果链表长度为0, 只有head时, 直接追加新节点
        if (this.length === 0) {
            this.head = newNode;
        } else {
            // 当长度大于0时, 在最后的位置添加新的节点
            let currentNode = this.head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
        // 3. 追加节点后, 长度+1
        this.length++;
    }

    // insert():在指定位置插入节点
    insert(position, data) {
        // position: 插入节点的位置
        // position = 0: 插入后是第一个节点
        // 1. 对position进行越界判断, 不能小于0或大于链表长度
        if (position < 0 || position > this.length) return false;
        // 2. 创建新节点
        const newNode = new Node(data);
        // 3. 插入节点
        if (position === 0) {
            // position = 0时, next指向原来第一个节点
            // newNode -> [head, 1]
            newNode.next = this.head;
            this.head = newNode;
        } else {
            // 0 < position <= length
            // 初始化变量
            let currentNode = this.head; // 当前节点初始化为head
            let previousNode = null; // head的上一节点为null
            let currentIndex = 0; // head的index为0
            while (currentIndex < position) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }
            previousNode.next = newNode;
            newNode.next = currentNode;
        }
        this.length++;
        return true;
    }

    // getData(position): 获取对应位置的元素
    getData(position) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) return null;
        // 2. 获取指定position的data
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentIndex < position) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        // 3. 返回data
        return currentNode.data;
    }

    // indexOf(data): 返回元素在链表中的索引，不存在该元素返回 -1
    indexOf(data) {
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentNode) {
            if (currentNode.data === data) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }
        return -1;
    }

    // update(position, data): 修改某个位置的元素
    update(position, data) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) return false;

        // 2. 循环遍历, 找到指定position节点
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentIndex < position) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        // 3. 修改data
        currentNode.data = data;
        return currentNode;
    }

    // removeAt(position): 删除特定位置的元素
    removeAt(position) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) return null;
        // 2. position = 0时
        let currentNode = this.head;
        if (position === 0) {
            this.head = this.head.next;
        } else {
            // position > 0时, 通过遍历找到position, 赋值currentNode
            let previousNode = null;
            let currentIndex = 0;
            while (currentIndex < position) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }
            // 上一节点的next指向当前节点的next, 就相当于删除了当前节点
            previousNode.next = currentNode.next;
        }
        // 3. 链表长度-1
        this.length--;
        return currentNode;
    }

    // remove(data): 删除指定 data 所在的节点。
    remove(data) {
        this.removeAt(this.indexOf(data));
    }

    // isEmpty(): 判断链表是否为空
    isEmpty() {
        return this.length === 0;
    }

    // size(): 获取链表长度
    get size() {
        return this.length;
    }


    // toString(): 遍历所有节点拼接字符串，直到 null，输出元素值
    toString() {
        let currentNode = this.head;
        let result = '';
        while (currentNode) {
            result += currentNode.data + ' -> ';
            currentNode = currentNode.next;
        }
        return result + 'null';
    }
}

module.exports = {
    Node,
    LinkedList
};