import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Category({ categories, color1, color2 }) {
    return (
        <section className="py-4 bg-white pb-7">
            <div className="max-w-7xl mx-auto px-3 md:px-8">
                <h2 className="text-2xl lg:text-4xl font-bold mb-5 mt-4 lg:text-center" style={{color: color1}}>Categories</h2>
                <div className="mt-4 flex overflow-x-auto space-x-5">
                    {categories?.map((category, index) => {
                        const [imageLoaded, setImageLoaded] = useState(false);

                        return (
                            <div key={index} data-theme="light" className="flex-shrink-0 group relative overflow-hidden border-[1px] border-gray-200 bg-white rounded-full lg:rounded-lg">
                                <Link to={`/category/${category._id}`}>
                                    {!imageLoaded && (
                                        <div
                                            className="w-28 h-28 lg:w-56 lg:h-52 rounded-sm skeleton flex items-center justify-center"
                                        >
                                        </div>
                                    )}
                                    <div className={`${!imageLoaded ? 'hidden' : ''} w-28 h-28 flex justify-center items-center bg-gray-200 group-hover:opacity-75 lg:w-56 lg:h-52`}>
                                        <img
                                            src={category?.image}
                                            alt="category"
                                            className="h-full w-full object-cover object-center"
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                    </div>
                                    <div className="w-full hidden bg-white lg:flex items-center justify-center py-4">
                                        <div>
                                            <h3 className="text-base font-bold" style={{color: color1}}>
                                                {category?.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Category