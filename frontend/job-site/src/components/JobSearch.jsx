import React, { useState } from 'react';

function JobSearch() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [bkkOnly, setBkkOnly] = useState(false);
  const [source, setSource] = useState("all");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchResults(1); // Reset to page 1 on new search
  };

  const fetchResults = async (targetPage = page) => {
    setIsLoading(true);
    const params = new URLSearchParams({
      keyword,
      page: targetPage.toString(),
      bkk: bkkOnly.toString(),
      source,
    });

    try {
      const res = await fetch(`http://localhost:8888/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setResults(data);
      setPage(targetPage);
    } catch (err) {
      console.error("Fetch error:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700 ml-4">Job Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div class="justify-self-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border p-2 rounded w-106 mr-1"
            placeholder='ค้นหางานที่ตามหา...'
          />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 pr-5 pl-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>


        </div>

        <div className="flex items-center ml-4">
        <label class="mr-2">แหล่งที่มา:</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border p-1 mr-4 rounded w-35"
          >
  
            <option value="all">ทั้งหมด</option>
            <option value="jobbkk">JobBKK.com</option>
            <option value="jobthai">JobThai.com</option>
            <option value="jobth">JobTH.com</option>
          </select>


          <input
            type="checkbox"
            checked={bkkOnly}
            onChange={() => setBkkOnly(!bkkOnly)}
            id="bkkOnly"
            className="mr-2 accent-green-600"
          />
          <label htmlFor="bkkOnly">ภายในกทม.</label>
        </div>


      </form>

      <div className="mt-6">
        <div className='block'> 
          <h2 className="text-xl font-semibold inline">Results:</h2>
          {results.length > 0 ? <p className="inline float-right text-gray-700">Page: {page}</p> : <></>}
        </div>

        {isLoading ? (
          <p className="text-gray-500 mt-2 justify-self-center">กำลังโหลด...</p>
        ) : results.length > 0 ? (
          <>
            <div className="space-y-4 mt-4">
              {results.map((job, index) => (
                <div
                  key={index}
                  className="pb-5 pr-5 pl-5 pt-3 border border-gray-200 rounded-2xl shadow-sm bg-white"
                >
                  <h3 className="text-lg font-bold text-green-700">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">บริษัท:</span> {job.company}
                  </p>

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">สถานที่:</span> {job.location}
                  </p>

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">เงินเดือน:</span> {job.salary}
                  </p>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    ดูงานนี้
                  </a>

                  <p className="mt-1 text-gray-700 float-right">
                    <span className="font-semibold">ที่มา:</span>{' '}
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      {job.source}
                    </span>
                  </p>

                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => fetchResults(page - 1)}
                disabled={page <= 1 || isLoading}
                className="px-3 py-1 bg-green-600 text-white text-xl rounded hover:bg-gray-400 disabled:opacity-50"
              >
                &#8592;
              </button>
              <span className="px-4 text-l text-gray-600">Page {page}</span>
              <button
                onClick={() => fetchResults(page + 1)}
                disabled={isLoading}
                className="px-3 py-1 bg-green-600 text-white text-xl rounded hover:bg-gray-400 disabled:opacity-50"
              >
                &#8594;
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-2 justify-self-center">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default JobSearch;
