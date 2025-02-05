const { Node, LinkedList } = require('../LinkedList/LinkedList');
// 双向链表的节点类（继承单向链表的节点类）
class DoublyNode extends Node {
    constructor(element, prev) {
        super(element);
        this.prev = (prev === undefined ? null : prev);
    };
}
class DoublyLinkedList extends LinkedList {
    constructor() {
        super();
        this.tail = null;
    };

    // append(element) 往双向链表尾部追加一个新的元素
    // 重写 append()
    append(element) {
        // 1、创建双向链表节点
        const newNode = new DoublyNode(element);

        // 2、追加元素
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // 跟单向链表不同，不用通过循环找到最后一个节点
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.length++;
    }

    // insert(position, data) 插入元素
    // 重写 insert()
    insert(position, element) {
        // 1. 边界检查
        if (position < 0 || position > this.length) return false;

        // 2. 创建新节点
        const newNode = new DoublyNode(element);

        // 3. 不同插入情况
        if (position === 0) {
            // 插入到开头
            if (this.head === null) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
        } else if (position === this.length) {
            // 插入到末尾
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            // 插入到中间
            let currentNode = this.head;
            let previousNode = null;
            let currentIndex = 0;

            // 找到插入点
            while (currentIndex < position) { // 在currentIndex递增前检查
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            // 连接新节点
            previousNode.next = newNode;
            newNode.prev = previousNode;
            newNode.next = currentNode;
            currentNode.prev = newNode;
        }

        this.length++;
        return true;
    }

    // getData() 继承单向链表
    getData(position) {
        return super.getData(position);
    }

    // indexOf() 继承单向链表
    indexOf(data) {
        return super.indexOf(data);
    }

    // removeAt() 删除指定位置的节点
    // 重写 removeAt()
    removeAt(position) {
        // 1、position 越界判断
        if (position < 0 || position > this.length - 1) return null;

        // 2、根据不同情况删除元素
        let currentNode = this.head;
        if (position === 0) {
            // 删除第一个节点的情况
            if (this.length === 1) {
                // 链表内只有一个节点的情况
                this.head = null;
                this.tail = null;
            } else {
                // 链表内有多个节点的情况
                this.head = this.head.next;
                this.head.prev = null;
            }
        } else if (position === this.length - 1) {
            // 删除最后一个节点的情况
            currentNode = this.tail;
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        } else {
            // 删除 0 ~ this.length - 1 里面节点的情况
            let targetIndex = 0;
            let previousNode = null;
            while (targetIndex++ < position) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
            currentNode.next.perv = previousNode;
        }
        this.length--;
        return currentNode.data;
    }

    // update(position, data) 修改指定位置的节点
    // 重写 update()
    update(position, data) {
        // 1、删除 position 位置的节点
        const result = this.removeAt(position);

        // 2、在 position 位置插入元素
        this.insert(position, data);
        return result;
    }

    // remove(data) 删除指定 data 所在的节点（继承单向链表）
    remove(data) {
        return super.remove(data);
    }

    // isEmpty() 判断链表是否为空
    isEmpty() {
        return super.isEmpty();
    }

    // size() 获取链表的长度
    size() {
        return super.size();
    }

    // forwardToString() 链表数据从前往后以字符串形式返回
    forwardToString() {
        let currentNode = this.head;
        let result = '';

        while (currentNode) {
            result += currentNode.data;
            if (currentNode.next) { // Only add " -> " if there's a next node
                result += ' -> ';
            }
            currentNode = currentNode.next;
        }

        return result;
    }

    // backwardString() 链表数据从后往前以字符串形式返回
    backwardString() {
        let currentNode = this.tail;
        let result = '';

        while (currentNode) {
            result += currentNode.data;
            if (currentNode.prev) { // Only add " -> " if there's a previous node
                result += ' -> ';
            }
            currentNode = currentNode.prev;
        }

        return result;
    }
}

module.exports = DoublyLinkedList;