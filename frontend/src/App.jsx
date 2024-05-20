// src/App.jsx
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock API call to a fake review detection endpoint
    const isFake = await fakeReviewDetectionApi(review);

    setResult(isFake ? <p className='text-red-600'>This review is Computer Generated.</p> : <p className='text-green-700'>This review is genuine.</p>);
  };

  // Mock function to simulate API call
  const fakeReviewDetectionApi = async (review) => {
    // Replace this with actual API call logic
    const res = await axios.post("http://localhost:8000/api/fake-review-detection", {review})
    return res && res.data.result == "CG"
  };

  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Fake Review Detection</h1>
        <button
          className="mb-4 text-sm text-gray-500 dark:text-gray-400"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Dark Mode
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="review">
              Review
            </label>
            <textarea
              id="review"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Detect
            </button>
          </div>
        </form>
        {result && <p className="mt-4 text-lg text-gray-900 dark:text-gray-300">{result}</p>}
      </div>
    </div>
  </div>
  );
}

export default App;
