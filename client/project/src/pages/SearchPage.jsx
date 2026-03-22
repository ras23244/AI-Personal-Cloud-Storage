import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { searchService } from '../services/api';
import { Search, Sparkles } from 'lucide-react';

const SearchPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setCurrentQuery(query);

    try {
      const data = await searchService.search(query);
      setResults(data.results || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = (result) => {
    navigate(`/file/${result.fileId}`, {
      state: { searchQuery: currentQuery },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Semantic Search</h1>
            <p className="text-gray-600">
              Find documents by meaning, not just keywords
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {results !== null ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <SearchResults
            results={results}
            query={currentQuery}
            onFileClick={handleFileClick}
          />
        </div>
      ) : (
        <div className="from-primary-50 to-blue-50 rounded-xl p-12 text-center border border-primary-100">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI-Powered Semantic Search
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Unlike traditional keyword search, our AI understands the meaning and context of your
            queries. Search for concepts, ideas, and topics across all your documents.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-primary-600 font-semibold mb-2">Natural Language</div>
              <div className="text-sm text-gray-600">
                Ask questions as you would to a person
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-primary-600 font-semibold mb-2">Context-Aware</div>
              <div className="text-sm text-gray-600">
                Finds documents by meaning, not exact words
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-primary-600 font-semibold mb-2">Ranked Results</div>
              <div className="text-sm text-gray-600">
                Most relevant documents appear first
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
