import { Injectable } from '@nestjs/common';
import {
  BinaryTree,
  BinaryTreeNode,
  IBinaryTree,
  IBinaryTreeNode,
} from './binary-tree';

@Injectable()
export class DbBinaryTreeService {
  public createTree<T>(): IBinaryTree<T> {
    return new BinaryTree();
  }

  public async addValue<T>(
    tree: IBinaryTree<T>,
    value: T,
  ): Promise<IBinaryTree<T> | null> {
    const node = tree.root;

    if (node === null) {
      tree.root = new BinaryTreeNode(value);
      return tree;
    } else {
      function searchTree(node: IBinaryTreeNode<T>) {
        if (value < node.value) {
          if (node.left === null) {
            node.left = new BinaryTreeNode(value);
            return tree;
          } else if (node.left !== null) {
            return searchTree(node.left as IBinaryTreeNode<T>);
          }
        } else if (value > node.value) {
          if (node.right === null) {
            node.right = new BinaryTreeNode(value);
            return tree;
          } else if (node.right !== null) {
            return searchTree(node.right as IBinaryTreeNode<T>);
          }
        } else {
          return null;
        }
      }

      return searchTree(node);
    }
  }

  public async findValue<T>(tree: IBinaryTree<T>, value: T) {
    function traverse(node: IBinaryTreeNode<T>) {
      if (!node) return null;

      if (value === node.value) {
        return value;
      }

      if (value > node.value) {
        return traverse(node.right);
      }

      if (value < node.value) {
        return traverse(node.left);
      }
    }
    return traverse(tree.root);
  }

  public async getAllValues<T>(tree: IBinaryTree<T>): Promise<T[] | null> {
    if (tree.root === null) {
      return null;
    } else {
      const result: Array<T> = [];

      function traverse(node: IBinaryTreeNode<T>) {
        node.left && traverse(node.left);
        node.right && traverse(node.right);
        result.push(node.value);
      }

      traverse(tree.root);

      return result;
    }
  }
}
