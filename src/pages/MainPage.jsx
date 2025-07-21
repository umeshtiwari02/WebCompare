import InputField from './InputField'
import Button, { ShowUrlsButton } from './Button'
import { useState } from 'react'
import axios from 'axios';
import ComparisonResults from './ComparisonResults';


export default function MainPage() {

    const [firstUrl, setFirstUrl] = useState('');
    const [secondUrl, setSecondUrl] = useState('');
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUrls, setShowUrls] = useState(false);
    const [showData, setShowData] = useState(false);
    const [comparisonData, setComparisonData] = useState([]);

    const handleComarisonResults = async () => {

        try {
            const comparisonResults = await axios.post("http://localhost:8080/api/compare", {
                url1: firstUrl,
                url2: secondUrl
            });
            setComparisonData(comparisonResults.data);

        }
        catch (error) {
            console.error(`Error : ${error}`);
        }
    }

    const handleSubmit = async () => {

        setShowData(true);

        setIsLoading(true); // start loading

        try {
            const firstUrlContent = await axios.post("http://localhost:8080/get-content", {
                url: firstUrl
            });
            const firstUrlAssicuatedLinksAndTexts = await axios.post("http://localhost:8080/get-urls-texts", {
                url: firstUrl
            });
            const secondUrlContent = await axios.post("http://localhost:8080/get-content", {
                url: secondUrl
            });
            const secondUrlAssicuatedLinksAndTexts = await axios.post("http://localhost:8080/get-urls-texts", {
                url: secondUrl
            });

            setResponses([firstUrlContent.data, firstUrlAssicuatedLinksAndTexts.data, secondUrlContent.data, secondUrlAssicuatedLinksAndTexts.data])

            handleComarisonResults();

        }
        catch (error) {
            // Extract meaningful error message
            const errorMessage1 = "First url is correct" | error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Unknown error occurred';
            const errorMessage2 = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Unknown error occurred';

            console.error('API Error:', errorMessage1);

            // Set responses with error messages
            setResponses([
                `Error in first URL content: ${errorMessage1}`,
                "",
                `Error in second URL content: ${errorMessage2}`,
                ""
            ]);

        }
        finally {
            setIsLoading(false); // stop loading
        }
    }


    // return (
    //     <div className="flex flex-col">
    //         <h4 className="text-center text-sm text-gray-400">Comparing between two different URLs.</h4>

    //         <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-5">
    //             <InputField value={firstUrl} onChange={(e) => setFirstUrl(e.target.value)} placeholder="Enter first url here" />
    //             <InputField value={secondUrl} onChange={(e) => setSecondUrl(e.target.value)} placeholder="Enter second url here" />
    //             <Button firstUrl={firstUrl} secondUrl={secondUrl} onClick={handleSubmit}>Submit</Button>
    //         </div>

    //         <br />
    //         <br />

    //         {
    //             showData && (firstUrl && secondUrl) ? <>
    //                 <div className='flex flex-col md:flex-row justify-around items-center gap-4 mt-5'>
    //                     {

    //                         !responses[0]?.startsWith('Error') && !responses[2]?.startsWith('Error')
    //                             ?
    //                             <ShowUrlsButton isLoading={isLoading} onClick={() => setShowUrls(!showUrls)}>{showUrls ? "Hide Associated Urls" : "Show Associated Urls"}</ShowUrlsButton>
    //                             :
    //                             ""
    //                     }
    //                 </div>

    //                 {isLoading ? (
    //                     <p className="min-h-[50vh] flex justify-center items-center">Processing your request...</p>
    //                 ) : (
    //                     <div className="flex flex-col xl:flex-row gap-4 w-full">
    //                         {/* First URL Section */}
    //                         <div className="w-full xl:w-1/2 p-2">
    //                             <h4 className="font-semibold mb-2">First url main content</h4>
    //                             <p className="bg-gray-300 p-4 rounded-md mb-4 text-sm md:text-base whitespace-pre-line">{responses[0]}</p>

    //                             {
    //                                 showUrls && <>

    //                                     <div className="p-4 bg-gray-200 rounded-lg">
    //                                         <h3 className="font-medium mb-3">Associated Links of First URL</h3>
    //                                         <div className="space-y-2">
    //                                             {responses[1].map((link, index) => (
    //                                                 <a
    //                                                     key={index}
    //                                                     href={link}
    //                                                     target="_blank"
    //                                                     rel="noopener noreferrer"
    //                                                     className="block px-3 py-2 bg-white rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition-colors"
    //                                                 >
    //                                                     {link}
    //                                                 </a>
    //                                             ))}
    //                                         </div>
    //                                     </div>
    //                                 </>
    //                             }
    //                         </div>



    //                         {/* Second URL Section */}
    //                         <div className="w-full xl:w-1/2 p-2">
    //                             <h4 className="font-semibold mb-2">Second url main content</h4>
    //                             <p className="bg-gray-300 p-4 rounded-md mb-4 text-sm md:text-base whitespace-pre-line">{responses[2]}</p>

    //                             {
    //                                 showUrls && <>

    //                                     <div className="p-4 bg-gray-200 rounded-lg">
    //                                         <h3 className="font-medium mb-3">Associated Links of Second URL</h3>
    //                                         <div className="space-y-2">
    //                                             {responses[3].map((link, index) => (
    //                                                 <a
    //                                                     key={index}
    //                                                     href={link}
    //                                                     target="_blank"
    //                                                     rel="noopener noreferrer"
    //                                                     className="block px-3 py-2 bg-white rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition-colors"
    //                                                 >
    //                                                     {link}
    //                                                 </a>
    //                                             ))}
    //                                         </div>
    //                                     </div>
    //                                 </>
    //                             }
    //                         </div>

    //                     </div>
    //                 )}
    //             </>
    //                 :
    //                 <div className='min-h-[50vh] flex justify-center items-center'>
    //                     You will get the data here after you enter urls
    //                 </div>
    //         }
    //     </div>
    // )

    return (
        <div className="flex flex-col dark:bg-gray-900">
            <h4 className="text-center text-sm text-gray-400 mb-5 md:mb-0 dark:text-gray-500">Comparison between two different URLs.</h4>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
                <InputField value={firstUrl} onChange={(e) => setFirstUrl(e.target.value)} placeholder="Enter first url here" />
                <InputField value={secondUrl} onChange={(e) => setSecondUrl(e.target.value)} placeholder="Enter second url here" />
                <Button firstUrl={firstUrl} secondUrl={secondUrl} onClick={handleSubmit}>Submit</Button>
            </div>

            <br />
            <br />

            {
                showData && (firstUrl && secondUrl) ? <>

                    {
                        !responses[0]?.startsWith('Error') && !responses[2]?.startsWith('Error') && !isLoading
                            ?
                            <ComparisonResults data={{
                                contentSimilarity: comparisonData.contentSimilarity,
                                sameTitle: comparisonData.sameTitle,
                                sameDescription: comparisonData.sameDescription,
                                commonHeadings: comparisonData.commonHeadings,
                                commonLinks: comparisonData.commonLinks,
                                titleDifferences: comparisonData.titleDifferences,
                                descriptionDifferences: comparisonData.descriptionDifferences
                            }} />
                            :
                            ""
                    }

                    <div className='flex flex-col md:flex-row justify-around items-center gap-4'>
                        {
                            !responses[0]?.startsWith('Error') && !responses[2]?.startsWith('Error') && !isLoading
                                ?
                                <ShowUrlsButton isLoading={isLoading} onClick={() => setShowUrls(!showUrls)}>{showUrls ? "Hide Associated Urls" : "Show Associated Urls"}</ShowUrlsButton>
                                :
                                ""
                        }
                    </div>

                    {isLoading ? (
                        <p className="min-h-[50vh] flex justify-center items-center dark:text-gray-300">Processing your request...</p>
                    ) : (
                        <div className="flex flex-col xl:flex-row gap-4 w-full">
                            {/* First URL Section */}
                            <div className="w-full xl:w-1/2 p-2">
                                <h4 className="font-semibold mb-2 dark:text-gray-300">First url main content</h4>
                                <p className="bg-gray-300 dark:bg-gray-700 p-4 rounded-md mb-4 text-sm md:text-base whitespace-pre-line dark:text-gray-200">{responses[0]}</p>

                                {
                                    showUrls && <>
                                        <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                            <h3 className="font-medium mb-3 dark:text-gray-300">Associated Links of First URL</h3>
                                            <div className="space-y-2">
                                                {responses[1].map((link, index) => (
                                                    <a
                                                        key={index}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block truncate overflow-hidden whitespace-nowrap px-3 py-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                                    >
                                                        {link}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                            {/* Second URL Section */}
                            <div className="w-full xl:w-1/2 p-2">
                                <h4 className="font-semibold mb-2 dark:text-gray-300">Second url main content</h4>
                                <p className="bg-gray-300 dark:bg-gray-700 p-4 rounded-md mb-4 text-sm md:text-base whitespace-pre-line dark:text-gray-200">{responses[2]}</p>

                                {
                                    showUrls && <>
                                        <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                            <h3 className="font-medium mb-3 dark:text-gray-300">Associated Links of Second URL</h3>
                                            <div className="space-y-2">
                                                {responses[3].map((link, index) => (
                                                    <a
                                                        key={index}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block truncate overflow-hidden whitespace-nowrap px-3 py-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                                    >
                                                        {link}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    )}
                </>
                    :
                    <div className='min-h-[50vh] flex justify-center items-center dark:text-gray-300'>
                        You will get the data here after you enter urls
                    </div>
            }
        </div>
    )


}
