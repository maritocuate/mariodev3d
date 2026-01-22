import React from 'react'

interface SkillTileProps {
  type: string
}

const SkillTile: React.FC<SkillTileProps> = ({ type }) => {
  const displayText = `#${type.toUpperCase()}`
  
  return (
    <div className="tile">
      <div className="item">
        {displayText}
      </div>
    </div>
  )
}

export default SkillTile
