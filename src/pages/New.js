import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostEditor from "../components/PostEditor";

const New = () => {
    return (
        <div className="New">
            <PostEditor />
        </div>
    );
};

export default New;
