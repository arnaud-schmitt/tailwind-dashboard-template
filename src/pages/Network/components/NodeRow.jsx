import { useEffect, useState } from "react";

function NodeRow({ node }) {
  const [updateInterval, setUpdateInterval] = useState(Math.random() * 5000);

  useEffect(() => {
    const interval = setInterval(() => {
      const update = {
        download: Math.random() > 0.33,
        downloadAdd: Math.floor(Math.random() * (32 + 32 + 1)) - 32,
        upload: Math.random() > 0.33,
        uploadAdd: Math.floor(Math.random() * (32 + 32 + 1)) - 32,
      }
      const newDonwnload = update.download ? parseInt(node.Download) + update.downloadAdd : node.Download;
      node.Download = `${newDonwnload > 0 ? newDonwnload : 0}`;
      const newUpload = update.upload ? parseInt(node.Upload) + update.uploadAdd : node.Upload;
      node.Upload = `${newUpload > 0 ? newUpload : 0}`;
      node.Uptime = parseInt(node.Uptime) + Math.round(updateInterval / 1000);
      setUpdateInterval(Math.random() * 5000);
    }, updateInterval)
    return () => clearInterval(interval);
  })

  const toReadableTime = (timeString) => {
    const time = parseInt(timeString);
    const d = Math.round(time / 86400);
    const h = Math.round(time % 86400 / 3600);
    const m = Math.round(time % 86400 % 3600 / 60);
    const s = Math.round(time % 86400 % 3600 % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  }

  return <tr className='pretty-hovering px-5 py-4 border-b border-gray-100 dark:border-gray-700/60'>
    {Object.keys(node).map((key) => {
      let specificStyle = '';
      if (key === 'Experience') {
        specificStyle =
          node[key] === 'Excellent' ? 'text-green-500'
          : node[key] === 'Good' ? 'text-yellow-500'
          : node[key] === 'Fair' ? 'text-orange-500'
          : 'text-red-500';
      } else if (key === 'Download') {
        specificStyle = node[key] !== '0' ? 'text-blue-500' : 'text-gray-600';
      } else if (key === 'Upload') {
        specificStyle = node[key] !== '0' ? 'text-violet-500' : 'text-gray-600';
      }
      let value = node[key];
      if (key === 'Uptime') {
        value = toReadableTime(node[key]);
      } else if (key === 'Download' || key === 'Upload') {
        value = `${value} bps`;
      }
      return <td key={value} className={`${specificStyle} text-xs text-left px-4 py-1 text-nowrap overflow-ellipsis overflow-hidden max-w-32 whitespace-nowrap`}>{value}</td>
    })}
  </tr>
}

export default NodeRow;
