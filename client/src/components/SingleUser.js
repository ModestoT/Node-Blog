import React from 'react';
import axios from 'axios';

class SingleUser extends React.Component {
    state = {
        user: '',
        posts: []
    };

    componentDidMount(){
        const user = this.props.users.find(user => `${user.id}` === this.props.match.params.id);
        
        axios
            .get(`http://localhost:4000/api/users/posts/${user.id}`)
            .then(res => {
                this.setState({ user: user, posts: res.data });
            })
            .catch(err => console.log(err))
    }
    render(){
        if(!this.state.user) return <h1>Opps!</h1>;
        return(
            <div>
                <h1>{this.state.user.name}</h1>
                {this.state.posts.map(post => {
                    return (
                        <div className="posts">
                            <p>{post.text}</p>
                            <p>{post.postedBy}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default SingleUser;