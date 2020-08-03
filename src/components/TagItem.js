import React from 'react'

function tagItem(props) {

  const { tag } = props;

  return (
    <div className="tag">
      {tag}
    </div>
  )
}

export default tagItem;
