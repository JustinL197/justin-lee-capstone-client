import './DiscussionCard.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import commentIcon from '../../assets/icons/comment-icon.svg';

const DiscussionCard = ({ discussion }) => {
  const { id, created_at, title, comment_count, username } = discussion;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/discussions/${id}`); // Navigate to discussion detail page
  };

  return (
    <div className="discussion-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="discussion-card__username-time-container">
        <div className="discussion-card__avatar-user-container">
          <div className="discussion-card__avatar"></div>
          <h3 className="discussion-card__user">{username}</h3>
        </div>
        <span className="discussion-card__timestamp">{new Date(created_at).toLocaleDateString()}</span>
      </div>
      <div className="discussion-card__content-container">
        <div className="discussion-card__content">
          <h4 className="discussion-card__title">{title}</h4>
        </div>
        <div className='discussion-card__comments-container'>
          <img src={commentIcon} alt="comments" className="commentIcon" />
          <p className="discussion-card__comments-count">{comment_count}</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;