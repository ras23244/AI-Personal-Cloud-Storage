from docling.document import DocumentConverter
from docling.chunker import HybridChunker

def parse_and_chunk(file_path):
    converter = DocumentConverter()
    result = converter.convert(file_path)
    document = result.document
    chunker= HybridChunker()
    chunks=[]
    for chunk in chunker.chunk(document):
        chunks.append({
            "text": chunk.text,
            "metadata": chunk.metadata,
            "section":chunk.meta.get("heading")
        })
    return chunks
