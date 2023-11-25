import React from 'react';
function formatTimestamp(timestamp) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp.timestamp);
  
  const timeDiff = currentDate.getTime() - commentDate.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0 && hours === 0 && minutes === 0) {
    return 'Just now';
  } else if (days === 0 && hours === 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (days === 0 && hours <= 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days === 1) {
    return 'Yesterday';
  } else {
    const options = { month: 'short', day: 'numeric' };
    return commentDate.toLocaleDateString('en-US', options);
  }
}


const Comments = ({ comments }) => {
  return (
    <div className="comments">
  <ul className="comment-list m-3">
    {comments.slice().reverse().map((comment, index) => (
      <li key={index} className="comment position-relative">
        <strong className='comment-user'>{comment.username}</strong>
        <p className='comment-body'>{comment.commentbody}</p>
        <div className="comment-details position-absolute bottom-0 end-0 mx-3">
          <p className='comment-create'>{formatTimestamp({timestamp:comment.createdAt})}</p>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Comments;
