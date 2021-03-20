import React from 'react';

const Rank = ({ userInfo: { entries, name } }) => {
  return (
    <div>
      <div className='white f3 tc'>
        {`${name}, your current rank is...`}
      </div>
      <div className='white f1 tc'>
        {`#${entries}`}
      </div>
    </div>
  )
}

export default Rank;