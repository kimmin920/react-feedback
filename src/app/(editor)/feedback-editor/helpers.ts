// deviceDetector.js
export const deviceDetector = () => {
  const userAgent = navigator.userAgent;
  let device = 'Unknown Device';
  let os = 'Unknown OS';
  let model = 'Unknown Model';

  // Check for iOS devices
  const iOSMatch = userAgent.match(/(iPad|iPhone|iPod).*OS (\d+_\d+)/);
  if (iOSMatch) {
    device = 'Mobile';
    os = 'iOS';
    model = iOSMatch[1] + ' ' + iOSMatch[2].replace(/_/g, '.');
  }

  // Check for Android devices
  const androidMatch = userAgent.match(
    /Android\s([\d.]+);.+?(Samsung|LG|HTC|Sony|Motorola|Google|OnePlus|Xiaomi|Oppo|Nokia|Huawei|ZTE|Realme|Vivo)/
  );
  if (androidMatch) {
    device = 'Mobile';
    os = 'Android';
    model = `${androidMatch[2]} ${androidMatch[1]}`; // e.g., Samsung 10
  }

  // Check for Windows devices
  const windowsMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
  if (windowsMatch) {
    device = 'Desktop';
    os = 'Windows';
    model = `Windows ${windowsMatch[1]}`;
  }

  // Check for Mac devices
  const macMatch = userAgent.match(/Macintosh.*Mac OS X (\d+_\d+)/);
  if (macMatch) {
    device = 'Desktop';
    os = 'MacOS';
    model = `Mac M${macMatch[1].replace(/_/g, '.')}`;
  }

  // Check for Linux
  if (/Linux/.test(userAgent)) {
    device = 'Desktop';
    os = 'Linux';
    model = 'Linux';
  }

  return `${model}, ${device}, ${os}`;
};

export function getCurrentUrlPath() {
  if (typeof window !== 'undefined') {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  }

  return 'N/A';
}
