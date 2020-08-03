import React from 'react'
import TagItem from './TagItem'

function tags(props) {

  const { tagList } = props;

  return (
    <div className="row tagRow">
      {tagList.split(',').map((tag, index) => {
        return(
          <TagItem tag={tag} key={index} />
        )
      })}
    </div>
  )

}

export default tags;
