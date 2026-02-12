// 图片辅助函数

// 生成图书封面图片（使用picsum.photos）
export const getBookCover = (id: string, width: number = 300, height: number = 400): string => {
  return `https://picsum.photos/${width}/${height}?random=${id}`
}

// 生成轮播图（使用渐变背景SVG）
export const getBannerImage = (index: number): string => {
  const colors = [
    { start: '#F5DBD3', end: '#8B7355' },
    { start: '#8B7355', end: '#A9755A' }
  ]
  const color = colors[index % colors.length]
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.start};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.end};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad${index})" />
    </svg>
  `)}`
}

// 生成活动图片（使用渐变背景SVG）
export const getActivityImage = (index: number): string => {
  const colors = [
    { start: '#D2B48C', end: '#F4A460' },
    { start: '#8B7355', end: '#A9755A' },
    { start: '#F4A460', end: '#F2820B' }
  ]
  const color = colors[index % colors.length]
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="act${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.start};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.end};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#act${index})" />
    </svg>
  `)}`
}

// 图片加载失败时的占位符
export const getPlaceholderImage = (width: number = 300, height: number = 400): string => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">暂无图片</text>
    </svg>
  `)}`
}


