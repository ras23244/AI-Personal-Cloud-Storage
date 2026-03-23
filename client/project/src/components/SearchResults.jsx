import { FileText, TrendingUp } from 'lucide-react';

const highlightText = (text, query) => {
  if (!query) return text;

  const words = query.toLowerCase().split(' ').filter(w => w.length > 2);
  let highlightedText = text;

  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark class="highlight-text">$1</mark>');
  });

  return highlightedText;
};

const SearchResults = ({ results, query, onFileClick }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600">Try adjusting your search query</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Found {results.length} relevant {results.length === 1 ? 'document' : 'documents'}
        </h2>
      </div>

      {results.map((result, index) => (
        <div
          key={result.fileId}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => onFileClick(result)}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center  group-hover:bg-primary-100 transition-colors">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {result.fileName}
                </h3>
                <div className="flex items-center gap-2 ">
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {Math.round(result.score * 100)}% match
                  </div>
                </div>
              </div>

              {/* <div className="space-y-3">
                {result.matchingChunks.slice(0, 3).map((chunk, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">Relevant excerpt {idx + 1}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {Math.round(chunk.score * 100)}% similarity
                      </span>
                    </div>
                    <p
                      className="text-sm text-gray-700 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(chunk.text, query),
                      }}
                    />
                  </div>
                ))}

                {result.totalChunks > 3 && (
                  <p className="text-sm text-gray-500 pl-4">
                    + {result.totalChunks - 3} more relevant {result.totalChunks - 3 === 1 ? 'section' : 'sections'}
                  </p>
                )}
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
