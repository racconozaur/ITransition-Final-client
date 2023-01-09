import React, { useState } from 'react';
import Button from '../../utils/button/Button';
import Post from './Post';
import { useTranslation } from 'react-i18next';

const PostsList = (props) => {

    const [value, setValue] = useState('')
    const [sorted, setSorted] = useState(false)

    const {t} = useTranslation()

    const sortedHandler = () => {
        setSorted(!sorted)
    }

    const sortedPosts = props.data.sort((a, b) => {
        return +b.rate - +a.rate
    })

    const filteredPosts = props.data.filter(post => {
        return post.title.toLowerCase().includes(value.toLowerCase())
    })

    const allPosts = filteredPosts.map(e => 
            <Post
                key={e._id}
                id={e._id}
                sender={e.sender}
                title={e.title}
                content={e.content}
                rate={e.rate}
                category={e.category}
                hashtags={e.hashtags}
                img={e.image}
                likes={e.likes}
            />
        )
    
    const allSortedPosts = sortedPosts.map(e => 
        <Post
            key={e._id}
            id={e._id}
            sender={e.sender}
            title={e.title}
            content={e.content}
            rate={e.rate}
            category={e.category}
            hashtags={e.hashtags}
            img={e.image}
            likes={e.likes}
        />
    )
    
    const allTags = props.tags.slice(0, 6).map(e => 
            <div className='mx-1'>
                {e.tag}
            </div>
        )

    
    return (
        <div className=' container mx-auto'>
            <div className='flex flex-col mt-4'>
                <input 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    type="text" 
                    className="px-3 py-2 bg-white w-full mx-0 lg:mx-auto lg:w-3/6 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1" 
                    placeholder={t("Search by title")} required
                />

                <div className=' w-full mx-0 lg:mx-auto lg:w-3/6 flex border-4 rounded-lg p-4 mt-4 dark:text-white font-semibold'>
                    {t("Recent tags")}: {allTags} ...
                </div>

                <div className='flex justify-between font-bold mx-auto w-5/12 mt-4'>
                    <div className='flex items-center'>
                        <h2 className='dark:text-white'>{t("Sort by")}:</h2> 
                        <Button
                            onClick={sortedHandler}
                            className={'bg-yellow-100 p-2'}
                        >
                            {t("Rate")}
                        </Button>
                        <Button
                            onClick={sortedHandler}
                            className={'bg-blue-300 p-2'}
                        >
                            {t("Latest")}
                            
                        </Button>
                    </div>
                    <div className='flex items-center font-normal dark:text-white'>{t("Sorted by")} {sorted ? t("Rate"): t("Latest")}</div>
                </div>
        
            </div>

            <div>
                {sorted ? allSortedPosts : allPosts.reverse()}
            </div>
            
            
        </div>
    );
};

export default PostsList;