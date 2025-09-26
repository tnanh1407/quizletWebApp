import { useEffect, useState } from "react";

export default function Folder() {
  const [folders, setFolders] = useState([]);

  // Giả lập fetch dữ liệu từ backend
  useEffect(() => {
    const demoData = [
      { id: 1, name: "Trạng từ", itemCount: 5 },
      { id: 2, name: "Liên từ", itemCount: 3 },
      { id: 3, name: "Giới từ", itemCount: 4 },
      { id: 4, name: "Động từ ghép không thể tách", itemCount: 5 },
    ];
    setFolders(demoData);
  }, []);

  return (
    <div>
      {folders.map((folder) => (
        <div className="creator-card" key={folder.id}>
          <span className="creator-card-count">{folder.itemCount} mục</span>
          <span className="creator-card-title">
            <i
              className="fa-regular fa-folder-open"
              style={{ marginRight: 8 }}
            ></i>
            {folder.name}
          </span>
        </div>
      ))}
    </div>
  );
}
