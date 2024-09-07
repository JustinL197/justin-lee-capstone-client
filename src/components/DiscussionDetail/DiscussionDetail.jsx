import './DiscussionDetail.scss';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import commentIcon from '../../assets/icons/comment-icon.svg';
import backIcon from '../../assets/icons/back-arrow.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import ModalDeleteDiscussion from '../ModalDeleteDiscussion/ModalDeleteDiscussion';
import Comments from '../Comments/Comments';  // Import the Comments component

const DiscussionDetail = () => {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [isLiked, setIsLiked] = useState(false); 
  const [likesCount, setLikesCount] = useState(0);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5050/discussions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDiscussion(response.data);
        setLikesCount(response.data.likes_count); 
      } catch (error) {
        setError('Failed to fetch discussion');
      }
    };

    fetchDiscussion();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);

      const updatedLikesCount = newLikeStatus ? likesCount + 1 : likesCount - 1;
      setLikesCount(updatedLikesCount);

      await axios.post(`http://localhost:5050/discussions/${id}/like`, { liked: newLikeStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setError('Failed to update like status');
    }
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5050/discussions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteModalOpen(false);
      navigate('/dashboard/discussions'); 
    } catch (error) {
      setError('Failed to delete discussion');
    }
  };

  // Function to increment comment count
  const incrementCommentCount = () => {
    setDiscussion((prevDiscussion) => ({
      ...prevDiscussion,
      comment_count: prevDiscussion.comment_count + 1,
    }));
  };

  // Function to decrement comment count
  const decrementCommentCount = () => {
    setDiscussion((prevDiscussion) => ({
      ...prevDiscussion,
      comment_count: prevDiscussion.comment_count - 1,
    }));
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!discussion) {
    return <p>Loading discussion...</p>;
  }

  const isCreator = discussion.user_id === userId;

  return (
    <div className="discussion-detail">
      <div className="discussion-detail__subcontainer">
        <div className="discussion-detail__username-timestamp-back-container">
          <div className="discussion-detail__back" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
            <img src={backIcon} alt="back-icon" className="back-icon" />
          </div>
          <div className="discussion-detail__username-timestamp-container">
            <p className="discussion-detail__username">Posted by: {discussion.username}</p>
            <p className="discussion-detail__timestamp">{new Date(discussion.created_at).toLocaleDateString()}</p>
          </div>
          {isCreator && (
            <img src={deleteIcon} onClick={() => setDeleteModalOpen(true)} className="delete-button" alt="delete" />
          )}
        </div>

        <h1 className="discussion-detail__title">{discussion.title}</h1>
        <p className="discussion-detail__content">{discussion.content}</p>

        <div className="discussion-detail__likes-comments-container">
          <div className="discussion-detail__likes" onClick={handleLikeToggle} style={{ cursor: 'pointer' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="20px" 
              fill={isLiked ? 'red' : '#C8c8c8'}
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
            <span className="discussion-detail__likes-count">{likesCount}</span>
          </div>
          <div className="discussion-detail__comments">
            <img src={commentIcon} alt='comment-icon'/>
            <span className="discussion-detail__comments-count">{discussion.comment_count}</span> 
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <Comments 
        incrementCommentCount={incrementCommentCount} 
        decrementCommentCount={decrementCommentCount} 
      />

      {isDeleteModalOpen && (
        <ModalDeleteDiscussion 
          onClose={() => setDeleteModalOpen(false)} 
          onConfirm={handleDelete} 
        />
      )}
    </div>
  );
};

export default DiscussionDetail;