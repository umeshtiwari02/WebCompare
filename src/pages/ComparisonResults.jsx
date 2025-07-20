
const ComparisonResults = ({ data }) => {
    return (
        <div className="m-3 mt-12 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b mb-2 pb-2 dark:border-gray-700">
                Website Comparison Results
            </h2>

            {/* Overall Similarity */}
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Content Similarity</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                    <div
                        className="bg-blue-600 dark:bg-blue-500 h-5 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${data.contentSimilarity * 100}%` }}
                    >
                        <span className="text-white text-xs font-bold">
                            {Math.round(data.contentSimilarity * 100)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Title Comparison */}
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Title</h3>
                {data.sameTitle ? (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Both sites have the same title: "{data.titleDifferences}"</span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center text-red-600 dark:text-red-400">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Titles are different</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="p-2 bg-red-50 dark:bg-gray-600 rounded border border-red-100 dark:border-gray-500">
                                <p className="font-medium text-gray-700 dark:text-gray-300">Site 1:</p>
                                <p className="text-gray-900 dark:text-gray-200">{data?.titleDifferences?.[0]}</p>
                            </div>
                            <div className="p-2 bg-red-50 dark:bg-gray-600 rounded border border-red-100 dark:border-gray-500">
                                <p className="font-medium text-gray-700 dark:text-gray-300">Site 2:</p>
                                <p className="text-gray-900 dark:text-gray-200">{data?.titleDifferences?.[1]}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Description Comparison */}
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Meta Description</h3>
                {data.sameDescription ? (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Both sites have the same description</span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex items-center text-red-600 dark:text-red-400">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Descriptions are different</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="p-3 bg-red-50 dark:bg-gray-600 rounded border border-red-100 dark:border-gray-500">
                                <p className="font-medium text-gray-700 dark:text-gray-300">Site 1:</p>
                                <p className="text-gray-900 dark:text-gray-200">{data?.descriptionDifferences?.[0]}</p>
                            </div>
                            <div className="p-3 bg-red-50 dark:bg-gray-600 rounded border border-red-100 dark:border-gray-500">
                                <p className="font-medium text-gray-700 dark:text-gray-300">Site 2:</p>
                                <p className="text-gray-900 dark:text-gray-200">{data?.descriptionDifferences?.[1]}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Common Headings */}
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Common Headings</h3>
                {(data?.commonHeadings?.length ?? 0) > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {data.commonHeadings.map((heading, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                            >
                                {heading}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No common headings found</p>
                )}
            </div>

            {/* Common Links */}
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Common Links</h3>
                {(data?.commonLinks?.length ?? 0) > 0 ? (
                    <ul className="space-y-2">
                        {data.commonLinks.map((link, index) => (
                            <li key={index} className="flex items-start">
                                <svg
                                    className="w-4 h-4 mt-1 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No common links found</p>
                )}
            </div>
        </div>
    );
};

export default ComparisonResults;