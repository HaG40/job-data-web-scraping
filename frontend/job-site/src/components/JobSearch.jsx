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
      <h1 className="text-2xl font-bold mb-4">Job Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border p-2 rounded w-100"
            placeholder='ค้นหางานที่ตามหา...'
          />

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border p-2 m-2 rounded"
          >
            <option value="all">แหล่งที่มา</option>
            <option value="jobbkk">JobBKK</option>
            <option value="jobthai">JobThai</option>
            <option value="jobth">JobTH</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={bkkOnly}
            onChange={() => setBkkOnly(!bkkOnly)}
            id="bkkOnly"
            className="mr-2"
          />
          <label htmlFor="bkkOnly">ภายในกทม.</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Results:</h2>

        {isLoading ? (
          <p className="text-gray-500 mt-2">กำลังโหลด...</p>
        ) : results.length > 0 ? (
          <>
            <div className="space-y-4 mt-4">
              {results.map((job, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <h3 className="text-lg font-bold text-blue-700">
                    {job.title || 'ไม่ระบุชื่อตำแหน่ง'}
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

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">ที่มา:</span>{' '}
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      {job.source}
                    </span>
                  </p>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    ดูงานนี้
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => fetchResults(page - 1)}
                disabled={page <= 1 || isLoading}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 text-sm text-gray-600">Page {page}</span>
              <button
                onClick={() => fetchResults(page + 1)}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-2">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default JobSearch;
