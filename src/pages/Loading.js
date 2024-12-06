import React from "react";
import { ReactComponent as LoadingIcon } from "../assets/icons/loading.svg";

function Loading() {
  const styles = {
    loading_container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    loading_icon: {
      width: "120px",
      height: "120px",
      marginBottom: "20px",
    },
    loading_text: {
      fontSize: "30px",
      fontWeight: "600",
      color: "#000",
      marginBottom: "10px",
    },
    loading_text2: {
      fontSize: "20px",
      fontWeight: "400",
      color: "#000",
    }
  };

  return (
    <div style={styles.loading_container}>
      <LoadingIcon style={styles.loading_icon} />
      <h3 style={styles.loading_text}>채팅 분석중...</h3>
      <h4 style={styles.loading_text2}>페이지를 이동하지 말아주세요!</h4>
    </div>
  );
}

export default Loading;
