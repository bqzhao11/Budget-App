export const refreshTokenSetup = (res) => {
    let refresh_timing = (res.tokenObj.exires_in || 3600 - 5 * 60) * 1000;

    const refresh_token = async () => {
        const new_auth_res = await res.reloadAuthResponse();
        refresh_timing = (new_auth_res.expires_in || 3600 - 5 * 60) * 1000;
        setTimeout(refresh_token, refresh_timing);
    }
    setTimeout(refresh_token, refresh_timing);
}