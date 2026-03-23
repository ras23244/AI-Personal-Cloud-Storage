import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    RPConfig,
    RPProvider,
    RPDefaultLayout,
    RPPages,
} from "@pdf-viewer/react";

const FileViewer = () => {
    const { fileId } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/files/${fileId}/url`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                setPdfUrl(res.data.url);
                console.log("PDF URL:", res.data.url);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUrl();
    }, [fileId]);

    if (!pdfUrl) return <p>Loading PDF...</p>;

    return (
        <RPConfig>
            <RPProvider src={pdfUrl}>
                <RPDefaultLayout style={{ height: "100vh" }}>
                    <RPPages />
                </RPDefaultLayout>
            </RPProvider>
        </RPConfig>
    );
};

export default FileViewer;