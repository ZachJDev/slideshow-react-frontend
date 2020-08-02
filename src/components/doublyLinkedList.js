class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let node = new Node(val);
    if (!this.head) this.head = node;
    else {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    this.length++;
    return this;
  }

  pop() {
    if (!this.tail) return undefined;

    let node = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    node.prev = null;
    this.length--;

    return node;
  }

  shift() {
    if (!this.head) return undefined;

    let node = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    node.next = null;
    this.length--;

    return node;
  }

  unshift(val) {
    let node = new Node(val);
    if (!this.head) this.tail = node;
    else {
      let oldHead = this.head;
      oldHead.prev = node;
      node.next = oldHead;
    }
    this.head = node;
    this.length++;
    return this;
  }

  get(pos) {
    let node;
    if (pos < 0 || pos >= this.length) return null;
    if (pos > this.length / 2) {
      node = this.head;
      for (let counter = 0; counter < pos; counter++) {
        node = node.next;
      }
    } else {
      node = this.tail;
      for (let counter = this.length - 1; counter > pos; counter--) {
        node = node.prev;
      }
    }
    return node;
  }

  set(pos, val) {
    let node = this.get(pos);
    if(!node) return false;
    node.val = val;
    return true;
  }

  insert(pos, val) {
    if (pos < 0 || pos >= this.length) return false;
    if(pos === 0) return !!this.unshift(val)
    if(pos === this.length) return !!this.push(val)

      let oldNode = this.get(pos);
      let newNode = new Node(val);

      oldNode.prev.next = newNode;
      newNode.prev = oldNode.prev;
      oldNode.prev = newNode;
      newNode.next = oldNode;

      this.length++;
      return true;
  }

  remove(pos) {
      if(pos === 0) return this.shift()
      if(pos === this.length - 1) return this.pop()
    let node = this.get(pos);
    if(!node) return undefined;
    let prevNode = node.prev;

    
    prevNode.next = node.next;
    node.next.prev = prevNode;
    
    node.next = null;
    node.prev = null;
    this.length--;
    return node;
  }

   static fromArray(arr, loop=false) {
     let newList = new DoublyLinkedList();
    for(let item of arr) {
      newList.push(item)
    }

    if(loop) {
      newList.tail.next = newList.head;
      newList.head.prev = newList.tail;
    }
    return newList
  }
}

export default DoublyLinkedList
