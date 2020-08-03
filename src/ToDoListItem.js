import React, { Component } from "react";
import "./static/ToDoListItem.css";

class ToDoListItem extends Component {
  render() {
    const { title, description, ...props } = this.props;

    return (
      <div className="ToDoListItem" {...props}>
        <div className="ToDoListItem-title">{title}</div>
        <div className="ToDoListItem-description">{description}</div>
      </div>
    );
  }
}

export default ToDoListItem;
