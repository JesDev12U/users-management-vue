const URL = process.env.VUE_APP_API;

export default {
  refreshToken: async (refreshToken) => {
    try {
      const response = await fetch(`${URL}/users/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Application: "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const json = await response.json();
      if (json.error) throw { error: true, message: json.message };
      else return { error: false, newAccessToken: json.newAccessToken };
    } catch (err) {
      console.error(err);
      return {
        error: true,
        message: err.message,
      };
    }
  },
  getAllData: async function (
    accessToken,
    refreshToken,
    path,
    success,
    error,
    errorCatch
  ) {
    try {
      const response = await fetch(`${URL}/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Application: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      if (json.error) {
        if (json.errorStr === "INVALID_TOKEN") {
          const responseToken = await this.refreshToken(refreshToken);
          if (responseToken.error) error(json);
          else
            this.getAllData(
              responseToken.newAccessToken,
              refreshToken,
              path,
              success,
              error,
              errorCatch
            );
        }
        error(json);
      } else success(json);
    } catch (err) {
      errorCatch(err);
    }
  },
};
