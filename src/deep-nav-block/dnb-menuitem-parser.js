import { parse } from '@wordpress/block-serialization-default-parser';
    // Parse menu content into hierarchical structure
    const parseMenuItems = (content) => {
        try {
            const blocks = parse(content);
            
            const buildMenuTree = (blocks) => blocks
                .filter(block => block.blockName !== null) // Skip blocks where blockName is null
                .map((block) => ({
                    id: block.attrs?.id || Date.now(),
                    title: block.attrs?.label || '',
                    url: block.attrs?.url || '#',
                    children: block.innerBlocks ? buildMenuTree(block.innerBlocks) : []
                }));
                const menuTree = buildMenuTree(blocks);
            return menuTree;
        } catch (error) {
            console.error('Error parsing menu items:', error);
            return [];
        }
    };

    export { parseMenuItems };