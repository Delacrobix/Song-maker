class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class ListaCircular {
  constructor() {
    this.head = null;
  }

  find(index) {
    if (!this.head) {
      return null;
    }

    let node = this.head;

    for( let i = 0; i < index; i++ ) {
      node = node.next;
    }

    return node.data;
  }

  add(data) {
    const nuevoNode = new Node(data);

    if (!this.head) {
      nuevoNode.next = nuevoNode;
      this.head = nuevoNode;
    } else {
      nuevoNode.next = this.head.next;
      this.head.next = nuevoNode;
      this.head = nuevoNode;
    }
  }

  deleteList() {
    if (!this.head) {
      return null;
    }

    const data = this.head.data;

    if (this.head === this.head.next) {
      this.head = null;
    } else {
      this.head.next = this.head.next.next;
    }

    return data;
  }

  indexOf(data) {
    if (!this.head) {
      return null;
    }

    if (this.head.data === data) {
      return 0;
    }

    let index = 1;
    let aux = this.head.next;

    do {
      if (aux.data === data) {
        return index;
      } else {
        index++;
        aux = aux.next;
      }
    } while (aux !== this.head);

    return -1;
  }
}
