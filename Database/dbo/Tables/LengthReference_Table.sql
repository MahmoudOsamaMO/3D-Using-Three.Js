CREATE TABLE [dbo].[LengthReference_Table] (
    [ID_LengthReference] INT            IDENTITY (1, 1) NOT NULL,
    [LengthReference]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_LengthReference_Table] PRIMARY KEY CLUSTERED ([ID_LengthReference] ASC)
);

