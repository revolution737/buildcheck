const checkCompatibility = (components) => {
  const issues = [];
  const warnings = [];

  const cpu = components.find(c => c.category === 'CPU');
  const mobo = components.find(c => c.category === 'MOTHERBOARD');
  const ram = components.find(c => c.category === 'RAM');
  const gpu = components.find(c => c.category === 'GPU');
  const psu = components.find(c => c.category === 'PSU');
  const caseComp = components.find(c => c.category === 'CASE');

  // 1. CPU <-> Motherboard socket match
  if (cpu && mobo) {
    if (cpu.specs.socket !== mobo.specs.socket) {
      issues.push({
        type: 'SOCKET_MISMATCH',
        message: `CPU socket ${cpu.specs.socket} does not match Motherboard socket ${mobo.specs.socket}`,
      });
    }
  }

  // 2. RAM type match
  if (cpu && mobo) {
     if (cpu.specs.ram_type !== mobo.specs.ram_type) {
        issues.push({
            type: 'RAM_TYPE_MISMATCH',
            message: `CPU requires ${cpu.specs.ram_type} but Motherboard supports ${mobo.specs.ram_type}`,
        });
     }
  }

  // 3. PSU wattage check
  if (psu) {
    const totalTdp = components.reduce((sum, c) => sum + (c.specs.tdp_watts || 0), 0);
    const requiredWattage = totalTdp * 1.2;
    if (requiredWattage > psu.specs.wattage) {
      issues.push({
        type: 'INSUFFICIENT_PSU',
        message: `Total TDP ${totalTdp}W (with safety margin ${Math.round(requiredWattage)}W) exceeds PSU capacity ${psu.specs.wattage}W`,
      });
    } else if (requiredWattage > psu.specs.wattage * 0.8) {
        // Warning: PSU headroom < 20%
        warnings.push({
            type: 'PSU_HEADROOM',
            message: 'PSU headroom is under 20%, consider upgrading',
        });
    }
  }

  // 4. GPU length vs Case
  if (gpu && caseComp) {
    if (gpu.specs.length_mm > caseComp.specs.max_gpu_length_mm) {
      issues.push({
        type: 'GPU_TOO_LONG',
        message: `GPU length ${gpu.specs.length_mm}mm exceeds Case max ${caseComp.specs.max_gpu_length_mm}mm`,
      });
    }
  }

  // 5. Motherboard form factor vs Case
  if (mobo && caseComp) {
    if (!caseComp.specs.supported_form_factors.includes(mobo.specs.form_factor)) {
      issues.push({
        type: 'FORM_FACTOR_MISMATCH',
        message: `Motherboard form factor ${mobo.specs.form_factor} is not supported by Case (Supports: ${caseComp.specs.supported_form_factors.join(', ')})`,
      });
    }
  }

  return {
    compatible: issues.length === 0,
    issues,
    warnings,
  };
};

module.exports = { checkCompatibility };
