import React, { Component } from "react";
import axios from "axios";
import "./App.css";

//Unxpected (network down, server down, db down, bug)
//Log them
//DIsplay generic and friendly error message
//interceptor can be succes or error. In this case we don't need c
axios.interceptors.response.use(null, error => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;
	if (!expectedError) {
		console.log("Logging the error", error);
		alert("An unexpected error occured.");
	}
	return Promise.reject(error);
});

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
	state = {
		posts: []
	};

	async componentDidMount() {
		//object distructuring {what param we need from the object : const name }
		const { data: posts } = await axios.get(apiEndpoint);
		console.log(posts);
		this.setState({ posts });
	}

	handleAdd = async () => {
		const obj = { title: "a", body: "b" };
		//we need to send this object to the server
		const { data: post } = await axios.post(apiEndpoint, obj);
		const posts = [post, ...this.state.posts];
		this.setState({ posts });
	};

	handleUpdate = async post => {
		post.title = "RAMBO" + 1;
		axios.put(apiEndpoint + "/" + post.id, post);

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
			await axios.delete(apiEndpoint + "/" + post.id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				alert("Expected, this post has already been deleted");

			this.setState({ posts: originalPosts });
		}
	};

	render() {
		return (
			<React.Fragment>
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
