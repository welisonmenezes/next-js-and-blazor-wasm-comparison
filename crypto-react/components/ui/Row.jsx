import React, { useEffect } from "react";

export default function Row({ index, total, onAfterRenderRow }) {
    useEffect(() => {
        if (index == total) {
            onAfterRenderRow();
        }
    }, [index, onAfterRenderRow, total]);

    return (
        <span>{index} </span>
    );
}
