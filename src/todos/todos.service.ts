import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  userId: string;
}

@Injectable()
export class TodosService {

  private todos: Todo[] = [];
  private nextId = 1;

  // Ajouter un Todo
  create(title: string, userId: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title,
      userId,
    };

    this.todos.push(todo);

    return todo;
  }

  // Récupérer les Todo d'un utilisateur
  findAll(userId: string): Todo[] {
    return this.todos.filter(
      (todo) => todo.userId === userId,
    );
  }

  // Modifier un Todo
  update(
    id: number,
    title: string,
    userId: string,
  ): Todo {

    const todo = this.todos.find(
      (item) => item.id === id,
    );

    if (!todo) {
      throw new NotFoundException('Todo introuvable');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez pas modifier ce Todo',
      );
    }

    todo.title = title;

    return todo;
  }

  // Supprimer un Todo
  remove(id: number, userId: string): void {

    const index = this.todos.findIndex(
      (item) => item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Todo introuvable');
    }

    if (this.todos[index].userId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez pas supprimer ce Todo',
      );
    }

    this.todos.splice(index, 1);
  }
}