import React from 'react';
import './Rank.css';


const Rank = ({ userInfo: { entries, name } }) => {
  return (
    <div className='user-info'>
      <div className='white f3 tc'>
        {`${name}, your current entry rank is...`}
      </div>
      <div className='white f1 tc'>
        {`#${entries}`}
      </div>
    </div>
  )
}

export default Rank;