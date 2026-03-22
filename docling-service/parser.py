from docling.document_converter import DocumentConverter
from docling.chunking import HybridChunker

def parse_and_chunk(file_path):
    print("Parsing and chunking file:", file_path)
    converter = DocumentConverter()
    result = converter.convert(file_path)

    document = result.document

    chunker = HybridChunker()

    chunks = []

    for chunk in chunker.chunk(document):
        chunks.append({
    "text": chunk.text,
    "metadata": chunk.meta.model_dump() if chunk.meta else {},
    "section": chunk.meta.heading if hasattr(chunk.meta, "heading") else None
    })
    print(f"Generated {len(chunks)} chunks from document.")

    return chunks