export const transformData = (data, newData) => {
    const specifications = [];
    let i = 0;
    while (true) {
      const specObj = {};
      let hasData = false;
      for (const key in data) {
        if (key.startsWith(`targetGroup_${i}`) || key.startsWith(`cpi_${i}`) || key.startsWith(`loi_${i}`) || key.startsWith(`ir_${i}`) || key.startsWith(`completes_${i}`)) {
          const newKey = key.replace(`_${i}`, ''); 
          specObj[newKey] = data[key];
          specObj.key = i
          hasData = true;
        }
      }
      if (!hasData) break; 
      const match = newData.find(item => item.key === i); 
      if (match) {
          specObj.country = match.country;
          specObj.language = match.language;
          specObj.selected = match.selected || false
        }
        
        specifications.push(specObj);
        i++;
    }
    Object.keys(data).forEach((key) => {
      if (key.startsWith('targetGroup_') || key.startsWith('cpi_') || key.startsWith('loi_') || key.startsWith('ir_') || key.startsWith('completes_')) {
          delete data[key];
      }
    });
    
    data.Regions = data.Regions.map(region => region.split('-')[0]);
    
    return { ...data, specifications };
  };
  
  
  