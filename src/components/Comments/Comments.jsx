import './Comments.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import deleteIcon from '../../assets/icons/delete.svg';
import DeleteModal from '../ModalDeleteConfirm/ModalDeleteConfirm';

const Comments = ({ incrementCommentCount, decrementCommentCount }) => {
  const { id: discussionId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [commentToDelete, setCommentToDelete] = useState(null); // Track comment to delete
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5050/discussions/${discussionId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        setError('Failed to fetch comments');
      }
    };

    fetchComments();
  }, [discussionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5050/discussions/${discussionId}/comments`,
        { content: newComment, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prevComments) => [...prevComments, { ...response.data, isLiked: false }]);
      setNewComment('');
      setIsFocused(false);
      incrementCommentCount();
    } catch (error) {
      setError('Failed to post comment');
    }
  };

  const handleLike = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5050/discussions/comments/${commentId}/like`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes_count: response.data.likes_count, isLiked: response.data.liked }
            : comment
        )
      );
    } catch (error) {
      setError('Failed to like the comment');
    }
  };

  const handleDelete = async () => {
    if (commentToDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5050/discussions/comments/${commentToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            discussion_id: parseInt(discussionId, 10),
          },
        });

        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentToDelete));
        decrementCommentCount();
        setIsModalOpen(false); // Close modal after deletion
        setCommentToDelete(null);
      } catch (error) {
        setError('Failed to delete comment');
      }
    }
  };

  const openDeleteModal = (commentId) => {
    setCommentToDelete(commentId);
    setIsModalOpen(true);
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleSubmit} className="comments-form">
        <div className="comments-form__wrapper">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder="Add your comment..."
            required
            className="comments-form__inputbox"
            onFocus={() => setIsFocused(true)}
            onBlur={() => !newComment && setIsFocused(false)}
          ></textarea>
        </div>
        {isFocused && (
          <div className="comments-form__actions-outside">
            <button type="submit" className="comments-form__submit">Post</button>
            <button type="button" onClick={() => setIsFocused(false)} className="comments-form__cancel">Cancel</button>
          </div>
        )}
      </form>

      {error && <p>{error}</p>}

      <div className="comments-list-container">
        {comments.map((comment) => (
          <div key={comment.id} className="comments">
            <div className="comments__header">
              <span className="comments__username">{comment.username} • {new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="comments__content">{comment.content}</p>

            <div className="comments__actions-container">
              <div className="comments__likes" onClick={() => handleLike(comment.id)} style={{ cursor: 'pointer' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill={comment.isLiked ? 'red' : '#C8c8c8'}
                >
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
                <span className="discussion-detail__likes-count">{comment.likes_count || 0}</span>
              </div>
              {comment.user_id === userId && (
                <img
                  src={deleteIcon}
                  onClick={() => openDeleteModal(comment.id)} // Open modal instead of alert
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Render the modal */}
      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};

export default Comments;