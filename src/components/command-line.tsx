import React, { useState, useRef, useEffect } from 'react';

const CommandLine = () => {
    const [commandHistory, setCommandHistory] = useState<{ type: string; content: string }[]>([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [commandIndex, setCommandIndex] = useState(-1);
    const inputRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCommand = (command: string) => {
        // Sample command responses - expand based on your submarine's capabilities
        const responses: { [key: string]: string } = {
            'help': 'Available commands:\n- help: Show this help message\n- status: Check submarine status\n- dive <depth>: Change depth\n- speed <knots>: Adjust speed\n- heading <degrees>: Change heading\n- surface: Return to surface',
            'status': 'Current Status:\nDepth: 50m\nSpeed: 5 knots\nHeading: 270°\nBattery: 85%\nOxygen: 95%',
            'surface': 'Initiating surface protocol...',
        };

        const commandLower = command.toLowerCase().trim();
        let response;

        if (commandLower === '') {
            return;
        }

        if (responses.hasOwnProperty(commandLower)) {
            response = responses[commandLower];
        } else if (commandLower.startsWith('dive ')) {
            const depth = parseInt(commandLower.split(' ')[1]);
            response = isNaN(depth) ? 'Invalid depth value' : `Adjusting depth to ${depth}m...`;
        } else if (commandLower.startsWith('speed ')) {
            const speed = parseInt(commandLower.split(' ')[1]);
            response = isNaN(speed) ? 'Invalid speed value' : `Adjusting speed to ${speed} knots...`;
        } else if (commandLower.startsWith('heading ')) {
            const heading = parseInt(commandLower.split(' ')[1]);
            response = isNaN(heading) ? 'Invalid heading value' : `Changing heading to ${heading}°...`;
        } else {
            response = `Unknown command: ${command}. Type 'help' for available commands.`;
        }

        setCommandHistory(prev => [...prev,
        { type: 'input', content: command },
        { type: 'output', content: response }
        ]);
        setCurrentCommand('');
        setCommandIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(currentCommand);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory(1);
        }
    };

    const navigateHistory = (direction: number) => {
        const inputCommands = commandHistory.filter(cmd => cmd.type === 'input');
        let newIndex = commandIndex + direction;

        if (newIndex >= inputCommands.length) {
            newIndex = inputCommands.length - 1;
        } else if (newIndex < -1) {
            newIndex = -1;
        }

        setCommandIndex(newIndex);
        if (newIndex === -1) {
            setCurrentCommand('');
        } else {
            setCurrentCommand(inputCommands[inputCommands.length - 1 - newIndex].content);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [commandHistory]);

    useEffect(() => {
        handleCommand('Type "help" for available commands.');
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-green-500 dark:text-green-400 p-4 font-mono text-sm h-full">
            <div
                ref={containerRef}
                className="h-48 overflow-y-auto mb-2 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800"
            >
                {commandHistory.map((cmd, index) => (
                    <div key={index} className="mb-1">
                        {cmd.type === 'input' ? (
                            <div>
                                <span className="text-blue-600 dark:text-blue-400">submarine</span>
                                <span className="text-gray-700 dark:text-gray-400">$&gt;</span>{' '}
                                {cmd.content}
                            </div>
                        ) : (
                            <div className="pl-4 whitespace-pre-line">{cmd.content}</div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <span className="text-blue-400">submarine</span>
                <span className="text-gray-400">$&gt;</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none ml-2 text-green-400"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default CommandLine;