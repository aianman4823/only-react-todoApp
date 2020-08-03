import React from "react";
import "./App.css";
import ToDoListItem from "./ToDoListItem";

class App extends React.Component {
  //ToDoListをstateに定義、初期値は[]
  state = {
    todolist: JSON.parse(localStorage.getItem("todolist")) || []
  };

  //todolist itemの追加
  addTodo = (item, callBack) => {
    //todolist stateに追加
    this.setState(
      {
        todolist: this.state.todolist.concat(item)
      },
      () => {
        //localStorageにtodolist stateを保存
        localStorage.setItem("todolist", JSON.stringify(this.state.todolist));
        //callback関数が引数に渡されていた場合に実行
        if (callBack) {
          callBack();
        } else {
          return;
        }
      }
    );
  };

  removeTodo = (item, callBack) => {
    this.setState(
      {
        todolist: this.state.todolist.filter(x => x !== item)
      },
      () => {
        //localStorageにtodolist stateを保存
        localStorage.setItem("todolist", JSON.stringify(this.state.todolist));
        //callBack関数が引数に渡されていた場合に実行
        if (callBack) {
          callBack();
        } else {
          return;
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            //formのデフォルトのイベントをキャンセル
            e.preventDefault();

            //idがtitleのElementを取得
            const titleElement = e.target.elements["title"];
            //id がdescriptinをElementを取得
            const descriptionElement = e.target.elements["description"];

            this.addTodo(
              {
                title: titleElement.value,
                description: descriptionElement.value
              },
              //stateの変更後に入力した値を空にする
              () => {
                titleElement.value = "";
                descriptionElement.value = "";
              }
            );
          }}
        >
          <div>
            <input id="title" placeholder="title" required />
            <textarea id="description" placeholder="description" required />
          </div>
          <div>
            <button type="submit">登録</button>
          </div>
        </form>

        <div>
          {/** todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
          {this.state.todolist.map(todo => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
              //クリックされたItemをtodoList stateから削除
              onClick={() => this.removeTodo(todo)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
