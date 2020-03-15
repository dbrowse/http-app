import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpSevice";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
	state = {
		posts: []
	};

	async componentDidMount() {
		//object distructuring {what param we need from the object : const name }
		const { data: posts } = await http.get(config.apiEndpoint);
		console.log(posts);
		this.setState({ posts });
	}

	handleAdd = async () => {
		const obj = { title: "a", body: "b" };
		//we need to send this object to the server
		const { data: post } = await http.post(config.apiEndpoint, obj);
		const posts = [post, ...this.state.posts];
		this.setState({ posts });
	};

	handleUpdate = async post => {
		post.title = "RAMBO" + 1;
		http.put(config.apiEndpoint + "/" + post.id, post);

		//create new array and get every item from the previous
		const posts = [...this.state.posts];

		//find index of this posts array in this array
		const indexOfPost = posts.indexOf(post);
		post[indexOfPost] = { ...post };
		this.setState({ posts });
	};

	handleDelete = async post => {
		const originalPosts = this.state.posts;

		//remove from table all posts by id that we delete.
		const posts = this.state.posts.filter(p => p.id !== post.id);
		this.setState({ posts });
		//Expected (404: not found, 400: bad request - CLIEBT ERRORS)
		// - Display a specific error message
		try {
			await http.delete("a" + config.apiEndpoint + "/" + post.id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				alert("This post has already been deleted");
			this.setState({ posts: originalPosts });
		}
	};

	render() {
		return (
			<React.Fragment>
				<ToastContainer></ToastContainer>
				<button className='btn btn-primary' onClick={this.handleAdd}>
					Add
				</button>
				<table className='table'>
					<thead>
						<tr>
							<th>Title</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.state.posts.map(post => (
							<tr key={post.id}>
								<td>{post.title}</td>
								<td>
									<button
										className='btn btn-info btn-sm'
										onClick={() => this.handleUpdate(post)}
									>
										Update
									</button>
								</td>
								<td>
									<button
										className='btn btn-danger btn-sm'
										onClick={() => this.handleDelete(post)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default App;
