import './AnnouncementCard.scss';
import React, { useState } from 'react';
import axios from 'axios';


const AnnouncementCard = ({ announcement, onClick}) => {
  const { id, topic, created_at, vote_count, title, preview } = announcement;
  const [currentVotes, setCurrentVotes] = useState(vote_count || 0);
  const [voteStatus, setVoteStatus] = useState(null);

  const handleUpvote = async () => {
    try {
      if (voteStatus === 'upvoted') {
        setCurrentVotes(currentVotes - 1);
        setVoteStatus(null);

        await axios.post(`http://localhost:5050/announcements/${id}/neutral`, { previousVote: 'upvoted' }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        const voteChange = voteStatus === 'downvoted' ? 2 : 1;
        setCurrentVotes(currentVotes + voteChange);
        setVoteStatus('upvoted');

        await axios.post(`http://localhost:5050/announcements/${id}/upvote`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
    } catch (error) {
      console.error('Error handling upvote:', error);
      if (voteStatus === 'upvoted') {
        setCurrentVotes(currentVotes + 1);
        setVoteStatus('upvoted');
      } else {
        setCurrentVotes(currentVotes - (voteStatus === 'downvoted' ? 2 : 1));
        setVoteStatus(voteStatus === 'downvoted' ? 'downvoted' : null);
      }
    }
  };

  const handleDownvote = async () => {
    try {
      if (voteStatus === 'downvoted') {
        setCurrentVotes(currentVotes + 1);
        setVoteStatus(null);

        await axios.post(`http://localhost:5050/announcements/${id}/neutral`, { previousVote: 'downvoted' }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        const voteChange = voteStatus === 'upvoted' ? 2 : 1;
        setCurrentVotes(currentVotes - voteChange);
        setVoteStatus('downvoted');

        await axios.post(`http://localhost:5050/announcements/${id}/downvote`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
    } catch (error) {
      console.error('Error handling downvote:', error);
      if (voteStatus === 'downvoted') {
        setCurrentVotes(currentVotes - 1);
        setVoteStatus('downvoted');
      } else {
        setCurrentVotes(currentVotes + (voteStatus === 'upvoted' ? 2 : 1));
        setVoteStatus(voteStatus === 'upvoted' ? 'upvoted' : null);
      }
    }
  };

  return (
    <div className="announcement-card" onClick={onClick}>
      <div className="announcement-card__topic-time-container">
        <div className="announcement-card__avatar-topic-container">
          <div className="announcement-card__avatar"></div>
          <h3 className="announcement-card__topic">{topic}</h3>
        </div>
        <span className="announcement-card__timestamp">{new Date(created_at).toLocaleDateString()}</span>
      </div>
      <div className="announcement-card__subcontainer">
        <div className="announcement-card__vote-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className={`upIcon ${voteStatus === 'upvoted' ? 'active-upvote' : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              handleUpvote();
            }}
            style={{ cursor: 'pointer' }}
          >
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
          </svg>
          <span className="votes">{currentVotes}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className={`downIcon ${voteStatus === 'downvoted' ? 'active-downvote' : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              handleDownvote();
            }}
            style={{ cursor: 'pointer' }}
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </div>

        <div className="announcement-card__content">
          <h4 className="announcement-card__title">{title}</h4>
          <p className="announcement-card__preview">{preview}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;