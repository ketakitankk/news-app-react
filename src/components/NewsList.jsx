import React from 'react'

const NewsList = (item) => {
  return (
          <div className='--card --px2 --m'>
              <img src={item["props"]["urlToImage"]} alt="related to news"
              className='--img --p --m2'/>
              <h4 className='--flex-start'>{item["props"]["title"]}</h4>
              <p className='description --m'>{item["props"]["description"]}</p>
              <div className='--flex-end --p --m'>
                 <a href={item["props"]["url"]}><p className='--text-sm --bold readMore'>.... Read more</p></a>
              </div>
        </div>
  )
}

export default NewsList