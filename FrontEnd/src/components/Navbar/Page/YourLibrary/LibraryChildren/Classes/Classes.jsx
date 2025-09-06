import React, { useState } from "react";
import SectionClasses from "../../../../../Sections/SectionClasses";

function generateClassCode(existingCodes = []) {
    let code;
    do {
        code = Math.random().toString(36).substr(2, 8).toUpperCase();
    } while (existingCodes.includes(code));
    return code;
}

export default function Classes() {
    const [showModal, setShowModal] = useState(false);
    const [className, setClassName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [classCode, setClassCode] = useState(generateClassCode());
    const [showPassword, setShowPassword] = useState(false); // Thêm state này

    const handleOpen = () => {
        setClassCode(generateClassCode());
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý lưu lớp học mới ở đây
        alert(`Tên lớp: ${className}\nMô tả: ${description}\nMã lớp: ${classCode}\nMật khẩu: ${password}`);
        setShowModal(false);
    };

    return (
        <>
            <div id="classes">
                <button
                    style={{
                        display: "block",
                        margin: "20px auto",
                        fontSize: "2rem",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#1976d2",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                    onClick={handleOpen}
                    title="Thêm lớp học"
                >
                    +
                </button>
                {showModal && (
                    <div style={{
                        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                        background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
                    }}>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                background: "#23243a",
                                padding: 32,
                                borderRadius: 12,
                                minWidth: 350,
                                boxShadow: "0 4px 24px #0008",
                                color: "#fff",
                                fontFamily: "inherit"
                            }}
                        >
                            <h2 style={{ textAlign: "center", marginBottom: 24, color: "#fff" }}>Thêm lớp học mới</h2>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", marginBottom: 6 }}>Tên lớp học:</label>
                                <input
                                    value={className}
                                    onChange={e => setClassName(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: 6,
                                        border: "1px solid #444",
                                        background: "#18192b",
                                        color: "#fff"
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", marginBottom: 6 }}>Mô tả lớp học:</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: 6,
                                        border: "1px solid #444",
                                        background: "#18192b",
                                        color: "#fff",
                                        minHeight: 60
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", marginBottom: 6 }}>Mã code lớp học:</label>
                                <input
                                    value={classCode}
                                    readOnly
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: 6,
                                        border: "1px solid #444",
                                        background: "#28294a",
                                        color: "#fff"
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", marginBottom: 6 }}>Mật khẩu tham gia:</label>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "8px 36px 8px 12px",
                                            borderRadius: 6,
                                            border: "1px solid #444",
                                            background: "#18192b",
                                            color: "#fff"
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: "absolute",
                                            right: 8,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            background: "none",
                                            border: "none",
                                            color: "#aaa",
                                            cursor: "pointer",
                                            fontSize: 18,
                                            padding: 0
                                        }}
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    >
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>
                            <div style={{ marginTop: 24, textAlign: "right" }}>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    style={{
                                        marginRight: 12,
                                        padding: "8px 18px",
                                        borderRadius: 6,
                                        border: "none",
                                        background: "#444",
                                        color: "#fff",
                                        cursor: "pointer",
                                        transition: "background 0.2s"
                                    }}
                                    onMouseOver={e => e.target.style.background = "#666"}
                                    onMouseOut={e => e.target.style.background = "#444"}
                                >Hủy</button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: "8px 18px",
                                        borderRadius: 6,
                                        border: "none",
                                        background: "#1976d2",
                                        color: "#fff",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        transition: "background 0.2s"
                                    }}
                                    onMouseOver={e => e.target.style.background = "#125ea7"}
                                    onMouseOut={e => e.target.style.background = "#1976d2"}
                                >Tạo lớp</button>
                            </div>
                        </form>
                    </div>
                )}
                <SectionClasses />
                <SectionClasses />
                <SectionClasses />
                <SectionClasses />
            </div>
        </>
    );
}